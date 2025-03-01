// Search Function
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

// Sorting Function
function sortTable(n) {
    let table = document.getElementById("mandiTable");
    let rows = table.rows;
    let switching = true;
    let shouldSwitch, i, x, y;
    let dir = "asc"; 
    let switchcount = 0;

    while (switching) {
        switching = false;
        let rowsArray = Array.from(rows).slice(1); 

        for (i = 0; i < rowsArray.length - 1; i++) {
            shouldSwitch = false;
            x = rowsArray[i].getElementsByTagName("TD")[n].innerText.toLowerCase();
            y = rowsArray[i + 1].getElementsByTagName("TD")[n].innerText.toLowerCase();

            if (dir === "asc" ? x > y : x < y) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rowsArray[i].parentNode.insertBefore(rowsArray[i + 1], rowsArray[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
