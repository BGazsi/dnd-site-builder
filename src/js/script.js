$(document).ready(function() {
  $('.menu--collapsable .doCollapse').on('click', function(e) {
    $(e.currentTarget).closest('.menu--collapsable')
      .toggleClass('col-sm-3 menu--collapsed')
    $(e.currentTarget).html() === '&gt;&gt;' ? $(e.currentTarget).html('<<') : $(e.currentTarget).html('>>')
    $('.edit-section').toggleClass('col-sm-9')
  })

  var $dragableBoxes = $('.box.box--draggable')
  var $draggedElement = null
  var DROP_HEIGHT = '50px'

  $.each($dragableBoxes, function(ind, box) {
    $(box).on('dragstart', handleDragStart)
  })

  var $dropElements = $('.drop')
  $.each($dropElements, function(ind, element) {
    $(element).on('dragenter', handleDragEnter)
    $(element).on('dragleave', handleDragLeave)
    $(element).on('dragover',  handleDragOver )
  })

  function handleDragStart(e) {
    $draggedElement = $(e.currentTarget)
    $(e.currentTarget).css({
      'opacity': '.6'
    })
  }

  function handleDragEnter(e) {
    $(e.currentTarget).css({
      'height': $draggedElement.outerHeight()
    })
    $(e.currentTarget).addClass('hovered-with-dragable')
  }

  function handleDragLeave(e) {
    $(e.currentTarget).css({
      'height': DROP_HEIGHT
    })
    $(e.currentTarget).removeClass('hovered-with-dragable')
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault()
    }

    e.dataTransfer.dropEffect = 'move'

    return false;
  }

})