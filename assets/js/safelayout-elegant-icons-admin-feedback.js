jQuery( document ).ready( function( $ ) {
	$( "#deactivate-safelayout-elegant-icons" ).click( function ( e ) {
		e.preventDefault();
		$( "#sl-ei-feedback-modal" ).css( 'display', 'block' );
	});
	$( "#sl-ei-feedback-modal" ).click( function ( e ) {
		if ( e.target === this ) {
			e.preventDefault();
			hideModal();
		}
	});
	$( document ).on( 'keydown', function ( e ) {
		if ( e.keyCode === 27 && $( "#sl-ei-feedback-modal" ).css( 'display' ) != 'none' ) { // ESC
			hideModal();
		}
	});
	function hideModal() {
		$( "#sl-ei-feedback-loader" ).css( 'display', 'none' );
		$( "#sl-ei-feedback-modal" ).css( 'display', 'none' );
	}
	$( "#sl-ei-feedback-submit" ).click( function ( e ) {
		e.preventDefault();
		$( "#sl-ei-feedback-loader" ).css( 'display', 'block' );
		var id = $( "[name='sl-ei-feedback-radio']:checked" ).attr( "id" );
		var type = $( "[name='sl-ei-feedback-radio']:checked" ).val() || '';
		var text = '';
		if ( id != 'sl-ei-feedback-item1' ) {
			text = $( "#" + id + "-text" ).val() || '';
		}
		$.post( sleiIconsAjax.ajax_url, {
			_ajax_nonce: sleiIconsAjax.nonce,
			action: "slei_icons_feedback",
			type: type,
			text: text
		}, function() {
			$( "#sl-ei-feedback-loader-msg" ).html( $( "#sl-ei-feedback-loader-msg-tr" ).html() );
			setTimeout( function(){$( '#sl-ei-feedback-modal' ).fadeTo( 1000, 0, function () {hideModal()} )}, 500 );
			window.location = $( "#deactivate-safelayout-elegant-icons" ).attr( "href" );
		});
	});
	$( "#sl-ei-feedback-skip" ).click( function ( e ) {
		e.preventDefault();
		$( "#sl-ei-feedback-modal" ).css( 'display', 'none' );
		window.location = $( "#deactivate-safelayout-elegant-icons" ).attr( "href" );
	});
	$( "[name='sl-ei-feedback-radio']" ).change( function() {
		$( "#sl-ei-feedback-item2-text,#sl-ei-feedback-item5-text,#sl-ei-feedback-item6-text" ).css( 'display', 'none' );
		if ( this.id != 'sl-ei-feedback-item1' ) {
			$( "#" + this.id + "-text" ).css( 'display', 'initial' );
		}
	});
	$( "#sl-ei-rate-later,#sl-ei-rate-already" ).click( function ( e ) {
		e.preventDefault();
		$.post( sleiIconsAjax.ajax_url, {
			_ajax_nonce: sleiIconsAjax.nonce,
			action: "slei_icons_rate_reminder",
			type: this.id
		});
		var el = $( "#sl-ei-rate-reminder" );
		el.fadeTo(100, 0, function () {
			el.slideUp(100, function () {
				el.remove();
			});
		});
	});
	$( "#sl-ei-upgrade-later" ).click( function ( e ) {
		e.preventDefault();
		$.post( sleiIconsAjax.ajax_url, {
			_ajax_nonce: sleiIconsAjax.nonce,
			action: "slei_icons_upgrade",
		});
		var el = $( "#sl-ei-upgrade-reminder" );
		el.fadeTo(100, 0, function () {
			el.slideUp(100, function () {
				el.remove();
			});
		});
	});
});