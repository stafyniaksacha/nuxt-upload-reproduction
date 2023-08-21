import formidable from 'formidable';

export default defineEventHandler(async (event) => {
  const form = formidable({});

  try {
    console.log('start upload with formidable');
    const [fields, files] = await form.parse(event.node.req);
    console.log('multipart read');

    const field = fields.field;
    const file = files.file;

    console.log({ field, file });

    return 'ok';
  } catch (error: any) {
    console.log('formidable error:');
    console.error(error);

    // this does nothing
    throw createError({
      statusCode: error.httpCode,
      statusMessage: error.name,
      message: error.message,
    });
  }
});
