
(function() {
    let imagesUploaded = [];

    const reader = new FileReader();
    reader.onloadend = function() {
        const payload = {
            src: reader.result
        };

        axios.post('/', payload, {})
            .then(res => {
                imagesUploaded.unshift(res.data.src);

                const imgCount = imagesUploaded.length;
                const imgWidth = window.screen.availWidth / imgCount - (500 / imgCount);
                const screenHeight = window.screen.availHeight - 400;

                $('#images_uploaded').empty();
                imagesUploaded.forEach(image => {
                    $("#images_uploaded").append(
                        `<li class="left_float"><img style="height: auto; max-height: ${screenHeight}px; width:${imgWidth}px;" src="${image}" /></li>`
                    );
                });
            })
            .catch(err => {
                alert('Couldn\'t upload an image');
            });

    };

    $('#post_image').on('click', () => {

        const imageSrc = $('#image_to_upload').val();

        if (!imageSrc) return;

        const el = document.getElementById('image_to_upload');

        reader.readAsDataURL(el.files[0]);

    });

})();