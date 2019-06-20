const headers = {
    'Content-Type': 'application/json',
    'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlODYzYTE1YTMwZjI5M2NkNjBkMzgiLCJpYXQiOjE1NjA5NDgwMzkwNTAsImV4cCI6MTU2MTAzNDQzOTA1MH0.0BogLfJVkQAPcqLK-Bvoygj_1PTzQoRcvq5eUJBi_3seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlODYzYTE1YTMwZjI5M2NkNjBkMzgiLCJpYXQiOjE1NjA5NDQ4OTc3NDMsImV4cCI6MTU2MTAzMTI5Nzc0M30.hANZbLEqsWJuPiurKLeeekAePz2uspSh44qBu1Bm9h4",
  };
let testList = await axios.get("http://localhost:3000/testUnit/",headers);





        const requestOptions = {
          method: 'GET',
          url: '/testUnit',
          'Content-Type': 'application/json',
          headers: {
              authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlODYzYTE1YTMwZjI5M2NkNjBkMzgiLCJpYXQiOjE1NjA5NDgwMzkwNTAsImV4cCI6MTU2MTAzNDQzOTA1MH0.0BogLfJVkQAPcqLK-Bvoygj_1PTzQoRcvq5eUJBi_3seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlODYzYTE1YTMwZjI5M2NkNjBkMzgiLCJpYXQiOjE1NjA5NDQ4OTc3NDMsImV4cCI6MTU2MTAzMTI5Nzc0M30.hANZbLEqsWJuPiurKLeeekAePz2uspSh44qBu1Bm9h4'
          }
      }
axios(requestOptions).then(res => {
    console.log(res);
  })
  .catch(err => {
     console.log(err)
  })