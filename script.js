
document.addEventListener('DOMContentLoaded', function() {
        const qr = document.getElementById('qr-code');
        const qrbutton = document.getElementById('generate_qr_button');


        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            // Fill the URL field with current URL and keep it editable.
            const url_box = document.getElementById('url_box');
            console.log(url_box)
            var activeTab = tabs[0];
            var currentURL = activeTab.url ;
            url_box.value = currentURL;

        });


        const showLoader = () => {
            document.getElementById('spinner').style.display = 'block';
        }
        
        const hideLoader = () => {
            document.getElementById('spinner').style.display = 'none';
        }

        hideLoader();


        const generateQRCode = (url, size) => {
            const qrcode = new QRCode('qr-code', {
                text: url,
                width: size,
                height: size
            })
        }
        

        const clearQRCode = () => {
            qr.innerHTML = "";

            const saveBtn = document.getElementById('save-link');
            if(saveBtn){
                saveBtn.remove();
            }
        }
        
        

        const createSaveBtn = (saveURL) => {
            const link = document.createElement('a');
            link.id = 'save-link';
            link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5'
            link.href = saveURL
            link.download = 'qrcode'
            link.innerHTML = 'Save Image'
            document.getElementById('generated').appendChild(link);
        
        };
        
    
        const onGenerateSubmit = (e) =>{
            e.preventDefault();
        
            clearQRCode();

            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                var activeTab = tabs[0];
                var pageURL = activeTab.url 
                var url = pageURL;
                
                const url_in = document.getElementById('url_box').value;
                // const size = document.getElementById('size').value;
                const size = 150;
                
                

                if(url === ''){
                    alert('Please enter a URL')
                }
                else{
                    showLoader();
                    setTimeout(()=> {
                        hideLoader();
                        generateQRCode(url_in, size);
                        
                        setTimeout(() => {
                            const saveUrl = qr.querySelector('img').src;
                            createSaveBtn(saveUrl);
            
            
                        }, 50);
            
                    }, 5000)
                }

            });

            

            
        };
        
        qrbutton.addEventListener('click', onGenerateSubmit);

});







