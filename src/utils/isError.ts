
const isError = (error: any): error is { status: number, message: string } => {
    return error.status && error.message
}
export default isError