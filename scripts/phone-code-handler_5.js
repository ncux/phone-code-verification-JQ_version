
const submitUrl = 'http://dl.sep18.xyz:8008/sendcode?phonenumber=';
const phoneNumber = document.querySelector('#phoneNumber');
const smsCode = document.querySelector('#smsCode');
const sendSMScode = document.querySelector('#sendSMScode');
const message = document.querySelector('#message');
const confirmCode = document.querySelector('#confirmCode');
//const downloadAnchor = document.querySelector('#downloadLink');
// const fileList = document.querySelector('#fileList');

sendSMScode.addEventListener('click', sendSMSverificationCode);


async function sendSMSverificationCode() {
    console.log(phoneNumber.value);
    await getSMScode();
}

async function getSMScode() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${submitUrl} + ${phoneNumber.value}`, true);

    xhr.onload = function() {
        if(xhr.status === 200) {
            console.log(xhr.responseText);
            message.style.display = 'block';
            message.innerHTML = xhr.responseText;
        }
    };

    xhr.send();
}


confirmCode.addEventListener('click', enableDownloadLink);


async function fetchFileList() {
    let fileData = await fetch('./data/filelist.json');
    let fileList = await fileData.json();  // parses JSON
    console.log(fileList);
    $('#fileList').tree({
        data: fileList,
        autoOpen: false,
        dragAndDrop: true
    });

}

function enableDownloadLink() {
    $('#fileList').on(
        'tree.click',
        event => {
            // The clicked node is 'event.node'
            let node = event.node;
          //  alert(node.name);
            let downloadAnchor = document.createElement('a');
            let downloadLink = `http://dl.sep18.xyz:8008/download?phonenumber=${phoneNumber.value}&code=${smsCode.value}&file=${node.name}`;
            downloadAnchor.setAttribute('href', downloadLink);
            downloadAnchor.setAttribute('download', node.name);
            downloadAnchor.innerHTML = node.name;
            downloadAnchor.click();
        }
    );
}


