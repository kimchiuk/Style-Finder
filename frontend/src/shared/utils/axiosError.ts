export const axiosError = (error: any) => {
    const errorCode = error.response.status
    const errorMessage = error.response.data.message
    console.log(error)
    console.log(errorCode, errorMessage)
    alert(errorMessage);
}