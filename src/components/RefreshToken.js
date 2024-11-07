export default function RefreshToken({ fechUserNotes }) {
    const refresh = async () => {
        try {
            const res = await fetch('/token', { credentials: "include" })
            await fechUserNotes()
        } catch (err) {
            console.log("server is down")
        }
    }
    refresh()
    return (
        <div>

        </div>
    )
}
