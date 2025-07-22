export default function AlertModal({
  children,
  id,
  label,
  text,
}: {
  children: React.ReactNode;
  id: string;
  label: string;
  text: string;
}) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box space-y-4">
        <h3>{label}</h3>
        <p>{text}</p>
        {children}
      </div>
    </dialog>
  );
}
