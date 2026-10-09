type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

export default function EmptyState({ icon, title, text }: EmptyStateProps) {
  return (
    <div className="empty">
      <span className="empty-icon" aria-hidden="true">
        {icon}
      </span>
      <h2 className="empty-title">{title}</h2>
      <p className="empty-text">{text}</p>
    </div>
  );
}
