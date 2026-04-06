"use client"

import { useState, useTransition } from "react"
import { createCommentAction, deleteCommentAction } from "@/app/actions/comment"
import { Trash2, Send } from "lucide-react"

interface Comment {
  id: string
  text: string
  createdAt: string
  user: {
    username: string
    displayName: string | null
    avatarUrl: string | null
  }
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
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    startTransition(async () => {
      const result = await createCommentAction(targetId, type, text)
      if (result.success) {
        setText("")
        // Optimistic: add a placeholder comment, will be replaced on revalidation
        setComments(prev => [{
          id: `temp-${Date.now()}`,
          text: text.trim(),
          createdAt: new Date().toISOString(),
          user: { username: 'you', displayName: 'You', avatarUrl: null }
        }, ...prev])
      }
    })
  }

  const handleDelete = (commentId: string) => {
    startTransition(async () => {
      const result = await deleteCommentAction(commentId)
      if (result.success) {
        setComments(prev => prev.filter(c => c.id !== commentId))
      }
    })
  }

  return (
    <div className="space-y-8">
      <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-muted-foreground border-b border-border/50 pb-4">
        Discussion — {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
      </h3>

      {/* Compose */}
      {currentUserId ? (
        <form onSubmit={handleSubmit} className="flex gap-3">
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
      <div className="space-y-6">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground py-8 text-center">No comments yet. Be the first.</p>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {comment.user.avatarUrl ? (
                <img src={comment.user.avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[9px] font-bold text-muted-foreground">
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
                {currentUserId && comment.user.username !== 'you' && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
