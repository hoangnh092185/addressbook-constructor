// bussiness Logic
function resetFields (){
  $(".new-address").not(".original").remove();
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-type").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
};

function Contact(first,last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
  console.log(first +" "+last);
};
function Address(building, street, city, state) {
  this.building = building;
  this.street = street;
  this.city = city;
  this.state = state;
};
 Contact.prototype.fullName = function() {
   return this.firstName + " " + this.lastName;
 };
// user interface Logic
$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address clone">' +
                                  '<div class="form-group clone">' +
                                    '<label for="new-type">Type</label>'+
                                    '<input type="text" class="form-control new-type">'+
                                  '</div>'+
                                 '<div class="form-group clone">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group clone">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group clone">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>');
  });
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedType = $(this).find("input.new-type").val();
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedType, inputtedStreet, inputtedCity, inputtedState)
      newContact.addresses.push(newAddress);
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");
    $(".contact").last().hover(function(event){
      event.preventDefault();
      alert("hi");
    });
    $(".contact").last().click(function() {
      $("#show-contact").fadeIn().css("background-color", "red");
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.building + ": " + address.street + ", " + address.city + " " + address.state + "</li>");
      });
    });
    resetFields();
  });
});
