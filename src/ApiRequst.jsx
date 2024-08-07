const apiRequst = async (url, postOptions, errorMsg = null) => {
    try {
      console.log(`Making request to: ${url}`);
      const response = await fetch(url, postOptions);

      if (!response.ok) throw Error('Request failed');
    }catch (err) {
      console.log(err.message);
      return err.message;
    }
    return null;
  };
  
export default apiRequst;