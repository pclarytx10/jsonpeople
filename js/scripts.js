var people = [{
  firstName: 'Greg',
  lastName: 'Abes'
}];

people[0].secret = 'Won the Nobel Prize for hospitatlity.'

$('#menuToggle').on('click', function() {
  //look for ul elments within the nav elment
  //toggle show / hides the selected elements
  $('nav ul').slideToggle({
    duration: 400
  });
});

$('a[data-remote=true]').on('click', function(ev){
  ev.preventDefault();
  $.ajax({
    url: $(this).attr('href'),
    method: 'get',
    dataType: 'jsonp'
  });
});

function loadResults(data) {
  if (data.firstName) {
    people.push(data);
  }
  else if (data.people) {
    people = people.concat(data.people);
  }
  listPeople();
}

function listPeople() {
  $('#people').slideUp()
    .empty();
    $.each(people, function(index, person){
      var item = $('#template').clone().attr('id','');
      var newContent = item.html()
        .replace('{{ person.firstName }}',person.firstName)
        .replace('{{ person.lastName }}',person.lastName)
        .replace('{{ person.secret }}',person.secret)

      item.html(newContent);

      item.removeClass('hidden');
      $('#people').append(item);
      $('#people').slideDown();
    });
}

listPeople();
