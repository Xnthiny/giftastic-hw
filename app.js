$(function() {
  $("#error").hide();

  const topics = [
    "dogs",
    "cats",
    "zebras",
    "dolphins"
  ]

  topics.forEach(topic => {
    $(".buttons")
      .append($(`<input>`)
        .attr({
          type: "button",
          value: `${topic}`,
          class: "btn btn-outline-info button"
        })
        .append(`${topic}`))
  })

  $(".add-button").on("click", function () {
    event.preventDefault();
    const input = $("#inputSearch").val()

    if(input === "") {
      alert("Please input text")
    } else {
      const queryURL = `https://api.giphy.com/v1/gifs/search?q=${input}&api_key=rnPyUNusF7t23FHN1c5ag0RsPpI4il1e&limit=10`;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(res => {
        if(res.data.length !== 0) {
          $("#error").hide();
          $(".buttons")
          .append($(`<input>`)
            .attr({
              type: "button",
              value: `${input}`,
              class: "btn btn-outline-info button"
            })
            .append(`${input}`))
        } else {
          $("#error").show();
        }
      })
    }
  })

  $(".images").on("click", "img", function() {
    const state = $(this).attr("data-state");
    const animateImage = $(this).attr("data-animate");
    const stillImage = $(this).attr("data-still");

    if (state === "still") {
      $(this).attr("src", animateImage);
      $(this).attr("data-state", "animate")
    } else if (state === "animate") {
      $(this).attr("src", stillImage);
      $(this).attr("data-state", "still")
    }
  })

  $(".buttons").on("click", ".button", function() {
    $("#gifsappeartext").hide();
    $("#error").hide();
    const selected = $(this).attr("value");
    const queryURL = `https://api.giphy.com/v1/gifs/search?q=${selected}&api_key=rnPyUNusF7t23FHN1c5ag0RsPpI4il1e&limit=10`;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(res => {
      console.log(res)
      const results = res.data;
      $(".images").empty();
      results.forEach(image => {
        console.log(image)
        const imageDiv = $("<div>");
        const p = $("<p>").text("Rating: " + image.rating);
        const imageTag = $("<img>");
        imageTag.attr("src", image.images.original_still.url);
        imageTag.attr("data-still", image.images.original_still.url);
        imageTag.attr("data-animate", image.images.original.url);
        imageTag.attr("data-state", "still");
        imageTag.attr("class", "gif");
        imageTag.appendTo(imageDiv);
        p.appendTo(imageDiv)
        imageDiv.attr({
          class: "image"
        })
        $(".images").append(imageDiv);
      })
    })
  })
})
