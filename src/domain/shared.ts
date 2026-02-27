export interface DomainError {
    message: string,
    code: number,
    name: string
}

export function isDomainError(obj: Record<string, any>): obj is DomainError {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.message === 'string' &&
    typeof obj.code === 'number' &&
    typeof obj.name === 'string'
  );
}