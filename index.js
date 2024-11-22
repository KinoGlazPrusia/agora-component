import AgoraComponent  from "./src/agora.js";

const iframe = document.getElementById('a')

setTimeout(() => {
    console.log('Navigate to course')
    iframe.navigateTo('http://localhost:8000/student-catalogue/course')
}, 5000)