export function formatDate(created_at: string | Date): string {
    const date = new Date(created_at);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}