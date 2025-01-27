var field = document.getElementById('Schedule-date');
if (field) {
    var picker = new Pikaday({
        field: field,
        format: 'MM-DD-YYYY',
    });
} else {
    console.error("Element with ID 'Schedule-date' not found.");
}
