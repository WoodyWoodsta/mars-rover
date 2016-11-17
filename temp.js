function lockoutSubmit(button) {
                                            var permission = document.getElementById("priv_pub").checked;
                                            console.log("permissions: "+permission);
                                            var oldValue = button.value;

                                            button.setAttribute('disabled', true);
                                            button.value = '...processing...';

                                            setTimeout(function(){
                                            button.value = oldValue;
                                            button.removeAttribute('disabled');
                                            }, 10000)
                                        }

                                        function addComment()
                                        {
                                            var comment = $('#userComment').val();
                                            var userId = "<?php echo $user_check; ?>";
                                            var videoId = "<?php echo $player_vid_id; ?>";

                                            // checking checkbox permission
                                            var permission = document.getElementById("priv_pub").checked;

                                            var data = '&comment=' + comment + '&userId=' + userId + '&videoId=' + videoId + '&coms_auth=' + permission;
                                            console.log(data);

                                            if (comment == "")
                                            {
                                                swal({title: "", text: "Comment is empty", type: "warning", timer: 1500, showConfirmButton: false});
                                            } else
                                            {
                                                $.ajax
                                                        ({
                                                            type: 'POST',
                                                            url: 'add_comment.php',
                                                            data: data,
                                                            success: function (data)
                                                            {
                                                                $('#userComment').val('');
                                                                $("#view_coms").val('Loading...');
                                                                $("#view_coms").load("view_comments.php", {userId: userId, videoId: videoId});

                                                                console.log(data);
                                                                if (!data)
                                                                {
                                                                    //  alert('error');
                                                                    //  $("#group_view").load('group_view.php');
                                                                    //  $('#groupName').value = "";
                                                                } else
                                                                {
                                                                    //  $("#group_view").load('group_view.php');
                                                                    //  $('#groupName').value = "";

                                                                }
                                                            }

                                                        });
                                            }
                                            //  $("#group_view").load('group_view.php');
                                        }
                                        ;
