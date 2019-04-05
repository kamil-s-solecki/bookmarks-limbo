import { environment } from 'src/environments/environment';

export function apiUrl(path: string): string {
    return `${environment.apiUrl}${path}`;
}
