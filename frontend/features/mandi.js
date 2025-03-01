function searchTable() {
    let input = document.getElementById("searchInput").value.toUpperCase();
    let table = document.getElementById("mandiTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            let textValue = td.textContent || td.innerText;
            tr[i].style.display = textValue.toUpperCase().indexOf(input) > -1 ? "" : "none";
        }
    }
}
