"use strict";

jQuery(document).ready(function ($) {
	//Delete event
	$("div.datalayer_variables").on("click", "li a", function (event) {
		event.preventDefault();
		$(this).parent().fadeOut('slow', function () {
			$(this).remove();
		});
	});

	//Add item event
	$("div.datalayer_variables").on("click", "a.tag_manager_add", function (event) {
		var $parent = $(this).parent();

		event.preventDefault();
		//Get accurate item count
		var item_count = parseInt($parent.find(".tag_manager_index").val());
		item_count += 1;
		$parent.find(".tag_manager_index").val(item_count);

		//Get the tag manager label
		var tag_label = $parent.find('.tag_manager_label').val();

		//Build HTML for new LI
		var html = '<li>';
		html += '<label for="var_name_' + item_count + '">' + mtm_admin.name + ':&nbsp;</label>';
		html += '<input type="text" value="" id="var_name_' + item_count + '" name="' + tag_label + '[' + item_count + '][name]" />';
		html += '&nbsp;&nbsp;-&nbsp;&nbsp;';
		html += '<label for="var_value_' + item_count + '">' + mtm_admin.value + ':&nbsp;</label>';
		html += '<input type="text" value="" id="var_value_' + item_count + '" name="' + tag_label + '[' + item_count + '][value]" />';
		html += '&nbsp;&nbsp;&nbsp;&nbsp;';
		html += '<a href="#" title="' + mtm_admin.delete + '"><img src="' + mtm_admin.delete_src + '" alt="' + mtm_admin.delete + '" title="' + mtm_admin.delete + '" width="20" height="20" /></a>';
		html += '</li>';

		//Append HTML
		$parent.find("ol").append(html);

		//Select the first input box in t he newly appended data
		$parent.find("ol li:last input:first").focus();
	});
});