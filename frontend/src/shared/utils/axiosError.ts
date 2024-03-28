export const axiosError = (error: any) => {
  const errorCode = error.response?.status;
  const errorMessage = error.response?.data.message;
  alert(errorMessage);
  return errorCode;
};
