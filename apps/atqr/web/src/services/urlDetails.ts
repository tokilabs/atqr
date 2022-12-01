const url = window.location.pathname;
const urlSearchParams = new URLSearchParams(url);
export async function getUrlId(props) {
  try {
    await urlSearchParams.getAll(props);
  } catch (error) {
    console.log(error);
    return error;
  }
}
