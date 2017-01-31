$(() => {

  var $resultLabel = $("h1[name='result']");
  var $formulaField = $("input[name='formula']");

  $("form").on("submit", (event) => {

    event.preventDefault();

    var formula = $.trim($formulaField.val());
    $resultLabel.text("Rolling...");

    var request = $.ajax({
      url: "/roll/" + formula,
      dataType: "json"
    });

    request.done((data) => {
      $resultLabel.html(data.result);
    });
    request.fail((err) => {
      $resultLabel.text("Error");
    });
  });
});
