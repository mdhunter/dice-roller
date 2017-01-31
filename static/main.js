$(() => {

  var $captionLabel = $("h2[name='caption']");
  var $resultLabel = $("h1[name='result']");
  var $formulaField = $("input[name='formula']");

  $("form").on("submit", (event) => {
    event.preventDefault();

    var formula = $.trim($formulaField.val());

    $captionLabel.text("Rolling " + formula + "...");
    $resultLabel.text("?");

    var request = $.ajax({
      url: "/roll/" + formula,
      dataType: "json"
    }).then((data) => {
      $captionLabel.text("Rolled " + formula + ":");
      $resultLabel.html(data.result);
    }, (err) => {
      $captionLabel.text("Error");
      $resultLabel.text("!");
    });

  });
});
