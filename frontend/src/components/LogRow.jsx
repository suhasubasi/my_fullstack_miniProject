function LogRow({ log, onDelete, onEdit }) {
    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString();
    };

    // show emoji for mood
    const moodEmoji = (mood) => {
        if (!mood) return '-';
        const emojis = ['😞', '😐', '🙂', '😊', '🤩'];
        return emojis[mood - 1];
    };

    return (
        <tr>
            <td>{log.activityId?.name || 'Unknown'}</td>
            <td>
                <span className="category-badge">
                    {log.activityId?.categoryId?.icon} {log.activityId?.categoryId?.name || '-'}
                </span>
            </td>
            <td>{formatDate(log.date)}</td>
            <td>{log.duration}h</td>
            <td>{moodEmoji(log.mood)}</td>
            <td>{log.notes || '-'}</td>
            <td>
                <button className="btn-edit" onClick={() => onEdit(log)}>Edit</button>
                <button className="btn-delete" onClick={() => onDelete(log._id)}>Delete</button>
            </td>
        </tr>
    );
}

export default LogRow;
