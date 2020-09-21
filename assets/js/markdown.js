function frameLoad() {
    let elements = document.getElementsByClassName('content_frame');

    for (let i = 0; i < elements.length; i++) {
        elements.item(i).height = 1000;
        console.log(elements.item(i));
    }


}