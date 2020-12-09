addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  let a = new URL(request.url).searchParams;
  if (a.get('postcode')) {
    return handlePostcode(a.get('postcode'));
  }
  return new Response('Hello world');
}

async function handlePostcode(postcode) {
  const cacheKey = `postcodeData-${postcode}`;
  const data = await KV_UK_HOUSE_PRICE.get(cacheKey);
  if (data !== null) {
    return new Response(data);
  }
  const transactionUrl = 'https://landregistry.data.gov.uk/data/ppi/transaction-record.json';

  let page = 0;
  let success = false;
  let respJson = null;
  let postCodeData = [];
  do {
    const resp = await fetch(`${transactionUrl}?_page=${page}&propertyAddress.postcode=${postcode}`)
    success = resp.status === 200;
    respJson = await resp.json();
    respJson = respJson.result;
    postCodeData = postCodeData.concat(respJson.items);
    page = page + 1;
  } while (success && respJson.next);

  if (!success) {
    throw new Error('Failed to recieve data');
  }

  const resp = JSON.stringify(postCodeData);
  
  await KV_UK_HOUSE_PRICE.put(cacheKey, resp, {expirationTtl: 604800});

  return new Response(resp);
}

