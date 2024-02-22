
// Promise 1
async function myAsyncFunction() {
    let isSuccessful = true;
  
    try {
      if (isSuccessful) {
        let value = 'Operation was successful.'; // when successful
        console.log('Success: ' + value);
      } else {
        throw new Error('Operation failed.'); // when error
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  }
  
  myAsyncFunction();
  
  // Promise 2
  const getData = (successRate = 0.5, latency = 1000) => new Promise((resolve, reject) => {
    const successRoll = Math.random();
  
    try {
      const data = { message: 'Hello, world!' };
  
      if (successRoll <= successRate) {
        setTimeout(() => resolve(data), latency);
      } else {
        setTimeout(() => reject('API failed to return data'), latency);
      }
    } catch (error) {
      console.error(error);
    }
  });
  
  const processData = async () => {
    try {
      const data = await getData();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  
  processData();
  
  // Promise chaining
  async function promiseChaining() {
    try {
        let result;
  
        result = await new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000));
        console.log(result); // 1
  
        result = await new Promise((resolve, reject) => setTimeout(() => resolve(result * 2), 1000));
        console.log(result); // 2
  
        result = await new Promise((resolve, reject) => setTimeout(() => reject(result * 2), 1000));
        console.log(result); // 4
    } catch (error) {
        console.error(error);
    }
  }
  
  promiseChaining();