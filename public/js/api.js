// wrap in IIFE to control scope
(function(){

   const baseURL = 'http://localhost:8080/static/apiTestForm.html'; //  for development, it's http://localhost:3030

   function testAPIs(){
    // test list first
    var testId = '';
    var testJSON = {};

    // list
    callAPI('GET', '/api/photos', null, null)
      .then((list)=>{
        console.log('\n\n***************************\nlist results:');
        console.log(list);
        testId = list[0]._id;
        // create form data object with photo and metadata
        // This section is for uploading a file to the REST API
        let input = document.querySelector('input[type="file"]')
        // If you don't have a file upload component to your application, a simple JSON object will do
        let data = {
          "title": "My API Test Title",
          "description": "This is an AJAX API test"
        }


        // create the POST call to the API
        callAPI('POST', '/api/photos', null, data)
          .then((photo)=>{
            photoId = photo._id;
            savedPhoto = photo;
            console.log('\n\n***************************\ncreate results:');
            console.log(photo);
            callAPI('GET','/api/photos/'+photo._id, null, null)
              .then((photo)=>{
            // output the result of the Promise returned by response.json()
              console.log('\n\n***************************\nfind results:');
              console.log(photo);
              callAPI('GET', '/api/photos'+photoId , null, null)
              .then((photo)=>{
                console.log('find results');
                console.log('photo');
                testJSON.description += 'appended by the AJAX API'
                callAPI('PUT','/api/photos/'+photoId, null, savedPhoto)
                .then((photo)=>{
                  console.log('\n\n***************************\nupdate results:');
                  console.log(photo);

                  callAPI('DELETE', '/api/photos/'+photoId, null, savedPhoto)
                    .then((result)=>{
                      console.log('\n\n***************************\ndelete result:');
                      console.log(result);
                })
            });
        });
     });
    })
    .catch((err)=>{
      console.error(err);
    });

  });

};

})
