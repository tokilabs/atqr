const url = window.location.pathname;
const urlSearchParams = new URLSearchParams(url);
export async function getUrlId() {
  try {
    await urlSearchParams.getAll('id');
  } catch (error) {
    console.log(error);
    return error;
  }
}
