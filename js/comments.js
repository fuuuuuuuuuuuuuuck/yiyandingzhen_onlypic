                    
                    function getcomments(id) {  


                    $.ajax({
                        url: "comments.php",
                        type: "post",
                        dataType: "text",
                        data: {
                            'pic_id' : id
                        },
                        success: function(resultjson) {
                        

                            var resultjson = JSON.parse(resultjson);
                            console.log(resultjson);
                        
                        }


                    })
                }