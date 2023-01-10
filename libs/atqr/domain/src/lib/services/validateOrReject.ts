import { validateOrReject } from 'class-validator';
export async function validate(props) {
  try {
    await validateOrReject(props);
  } catch (errors) {
    console.log(
      'Caught promise rejection (validation failed). Errors: ',
      errors
    );
  }
}
