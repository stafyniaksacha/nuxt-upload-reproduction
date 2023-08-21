export default defineEventHandler(async (event) => {
  console.log('start upload');
  const multipart = await readMultipartFormData(event);
  console.log('multipart read');

  if (!multipart) {
    return 'ko';
  }

  const field = multipart.find((data) => data.name === 'field');
  const file = multipart.find((data) => data.name === 'file');

  console.log({ field, file });

  return 'ok';
});
