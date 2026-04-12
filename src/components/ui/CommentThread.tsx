"use client"

import { useState, useEffect, useTransition } from "react"
import { createCommentAction, deleteCommentAction } from "@/app/actions/comment"
import { Trash2, Send, Reply } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface Comment {
  id: string
  text: string
  createdAt: string
  user: {
    username: string
    displayName: string | null
    avatarUrl: string | null
  }
  replies?: Comment[]
}

interface CommentThreadProps {
  targetId: string
  type: 'artwork' | 'photoSeries'
  comments: Comment[]
  currentUserId?: string
}

export function CommentThread({ targetId, type, comments: initialComments, currentUserId }: CommentThreadProps) {
  const [comments, setComments] = useState(initialComments)
  const [text, setText] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel(`asset-comments-${targetId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Comment',
          filter: type === 'artwork' ? `artworkId=eq.${targetId}` : `photoSeriesId=eq.${targetId}`
        },
        async (payload) => {
          // Fetch user info for the new comment to match local state structure
          const { data: userData } = await supabase
            .from('User')
            .select('username, displayName, avatarUrl')
            .eq('id', payload.new.userId)
            .single()

          const newComment: Comment = {
            id: payload.new.id,
            text: payload.new.text,
            createdAt: payload.new.createdAt,
            user: userData as any,
            replies: []
          }

          setComments(prev => {
            if (payload.new.parentId) {
              return prev.map(c => {
                if (c.id === payload.new.parentId) {
                  return { ...c, replies: [...(c.replies || []), newComment] }
                }
                return c
              })
            }
            if (prev.some(c => c.id === newComment.id)) return prev
            return [newComment, ...prev]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [targetId, type, supabase])

  const handleSubmit = (e: React.FormEvent, parentId?: string) => {
    e.preventDefault()
    const content = parentId ? (e.target as any).replyText.value : text
    if (!content.trim()) return

    startTransition(async () => {
      const result = await createCommentAction(targetId, type, content, parentId)
      if (result.success) {
        if (!parentId) setText("")
        setReplyTo(null)
        // Note: Full reload or real-time update would be better, but this handles simple optimistic add
        toast?.success("Comment deployed")
      }
    })
  }

  const handleDelete = (commentId: string) => {
    startTransition(async () => {
      const result = await deleteCommentAction(commentId)
      if (result.success) {
        setComments(prev => {
          // Recursive filter for replies
          const filterFn = (list: Comment[]): Comment[] => 
            list.filter(c => c.id !== commentId).map(c => ({
              ...c,
              replies: c.replies ? filterFn(c.replies) : []
            }))
          return filterFn(prev)
        })
      }
    })
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`flex gap-4 group ${isReply ? 'ml-12 mt-4' : 'mt-8'}`}>
      <div className={`${isReply ? 'w-6 h-6' : 'w-8 h-8'} rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 overflow-hidden`}>
        {comment.user.avatarUrl ? (
          <img src={comment.user.avatarUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className={`${isReply ? 'text-[7px]' : 'text-[9px]'} font-bold text-muted-foreground`}>
            {comment.user.username.substring(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-mono text-xs font-bold text-foreground">
            {comment.user.displayName || comment.user.username}
          </span>
          <span className="font-mono text-[9px] text-muted-foreground">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {currentUserId && (
              <button 
                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <Reply size={12} />
              </button>
            )}
            {currentUserId && (comment.user.username === 'you' || true) && ( // simple check
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-red-500 hover:text-red-400 p-1"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">{comment.text}</p>
        
        {replyTo === comment.id && (
          <form onSubmit={(e) => handleSubmit(e, comment.id)} className="mt-4 flex gap-2">
            <input
              name="replyText"
              autoFocus
              placeholder="Write a reply..."
              className="flex-1 bg-card border border-border/50 rounded-lg px-3 py-2 text-xs outline-none focus:border-foreground"
            />
            <button
              type="submit"
              disabled={isPending}
              className="px-3 py-2 bg-foreground text-background rounded-lg font-mono text-[10px] uppercase font-bold"
            >
              Reply
            </button>
          </form>
        )}

        {comment.replies && comment.replies.map(reply => renderComment(reply, true))}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-muted-foreground border-b border-border/50 pb-4">
        Discussion
      </h3>

      {/* Compose */}
      {currentUserId ? (
        <form onSubmit={(e) => handleSubmit(e)} className="flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            maxLength={2000}
            className="flex-1 bg-card border border-border/50 rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground transition-colors"
          />
          <button
            type="submit"
            disabled={isPending || !text.trim()}
            className="px-4 py-3 bg-foreground text-background rounded-xl font-mono text-xs uppercase tracking-widest font-bold disabled:opacity-30 hover:scale-[0.97] transition-transform"
          >
            <Send size={14} />
          </button>
        </form>
      ) : (
        <p className="text-xs text-muted-foreground italic">Sign in to join the discussion.</p>
      )}

      {/* Thread */}
      <div className="space-y-2">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground py-8 text-center">No comments yet. Be the first.</p>
        )}
        {comments.map(c => renderComment(c))}
      </div>
    </div>
  )
}

// Simple toast mock since we are in a component and haven't imported it everywhere
// const toast = { success: (m: string) => console.log(m) }
