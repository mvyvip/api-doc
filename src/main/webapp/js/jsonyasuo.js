/**
	1 压缩
	2 转义
	3 压缩转义
	*/
	function yasuo(ii){
	var txtA = document.getElementById("json_input");
	var text = txtA.value;
	if(ii==1||ii==3){
	text = text.split("\n").join(" ");
	var t = [];
	var inString = false;
	for (var i = 0, len = text.length; i < len; i++) {
	var c = text.charAt(i);
	if (inString && c === inString) {
	// TODO: \\"
	if (text.charAt(i - 1) !== '\\') {
	inString = false;
	}
	} else if (!inString && (c === '"' || c === "'")) {
	inString = c;
	} else if (!inString && (c === ' ' || c === "\t")) {
	c = '';
	}
	t.push(c);
	}
	text= t.join('');
	}
	if(ii==2||ii==3){
	text = text.replace(/\\/g,"\\\\").replace(/\"/g,"\\\"");
	}
	if(ii==4){
	text = text.replace(/\\\\/g,"\\").replace(/\\\"/g,'\"');
	}
	txtA.value = text;
	}
	String.prototype.trim=function()
	{
	return this.replace(/(^\s*)|(\s*$)/g, '');
	}
	var GB2312UnicodeConverter={
	ToUnicode:function(str){
	var txt= escape(str).toLocaleLowerCase().replace(/%u/gi,'\\u');
	//var txt= escape(str).replace(/([%3F]+)/gi,'\\u');
	return txt.replace(/%7b/gi,'{').replace(/%7d/gi,'}').replace(/%3a/gi,':').replace(/%2c/gi,',').replace(/%27/gi,'\'').replace(/%22/gi,'"').replace(/%5b/gi,'[').replace(/%5d/gi,']').replace(/%3D/gi,'=').replace(/%20/gi,' ').replace(/%3E/gi,'>').replace(/%3C/gi,'<').replace(/%3F/gi,'?');//
	}
	,ToGB2312:function(str){
	return unescape(str.replace(/\\u/gi,'%u'));
	}
	};
	
	function u2h(){
	var txtA = document.getElementById("json_input");
	var text = txtA.value;
	text = text.trim();
	// text = text.replace(/\u/g,"");
	txtA.value = GB2312UnicodeConverter.ToGB2312(text);
	}
	
	function h2u(){
	var txtA = document.getElementById("json_input");
	var text = txtA.value;
	text = text.trim();
	// text = text.replace(/\u/g,"");
	txtA.value = GB2312UnicodeConverter.ToUnicode(text);
	}
	
	function cnChar2EnChar(){
	var txtA = document.getElementById("json_input");
	var str = txtA.value;
	str = str.replace(/\’|\‘/g,"'").replace(/\“|\”/g,"\"");
	str = str.replace(/\【/g,"[").replace(/\】/g,"]").replace(/\｛/g,"{").replace(/\｝/g,"}");
	str = str.replace(/，/g,",").replace(/：/g,":");
	txtA.value = str;
	}
	
	/**加载一段json*/
	function loadExampleJson(textarea){
		$("textarea[name='param']").val('{"site":"1","time":1430356305,"orderno":100203848,"apptype":"8","api_version":"v2.1.0","name":"中文"}');
	}
	
	function add_onload_function(fn)
    {
      var oe=window.onload;
      window.onload = function() { if (oe) oe(); fn(); }
    }
    add_onload_function(function() {
      var tabsize = get_var('tabsize');
      var braces_on_own_line = get_var('braces');
      var c;
      if (tabsize) {
        document.getElementById('tabsize').value = tabsize;
      }
      if (braces_on_own_line) {
        document.getElementById('braces-on-own-line').checked = 'checked';
      }
      if (get_var('test')) {
        run_tests();
      } else {
        c = document.forms[0].content;
        c && c.setSelectionRange && c.setSelectionRange(0, 0);
        c && c.focus && c.focus();
      }
    });

    function trim_leading_comments(str)
    {
      str = str.replace(/^(\s*\/\/[^\n]*\n)+/, '');
      str = str.replace(/^\s+/, '');
      return str;
    }

    function unpacker_filter(source)
    {
      if (document.getElementById('detect-packers').checked) {
        var stripped_source = trim_leading_comments(source);
        var unpacked = '';
        if (P_A_C_K_E_R.detect(stripped_source)) {
          unpacked = P_A_C_K_E_R.unpack(stripped_source);
          if (unpacked !== stripped_source) {
            return unpacker_filter(unpacked);
          }
        }
        if (EscapedBookmarklet.detect(source)) {
          unpacked = EscapedBookmarklet.unpack(source);
          if (unpacked !== stripped_source) {
            return unpacker_filter(unpacked);
          }
        }
        if (JavascriptObfuscator.detect(stripped_source)) {
          unpacked = JavascriptObfuscator.unpack(stripped_source);
          if (unpacked !== stripped_source) {
            return unpacker_filter(unpacked);
          }
        }
      }
      return source;
    }
	
	function do_js_beautify()
    {
      var js_source = document.getElementById('json_input').value.replace(/^\s+/, '');
      var indent_size = document.getElementById('tabsize').value;
      var indent_char = ' ';
      var preserve_newlines = document.getElementById('preserve-newlines').checked;
      var keep_array_indentation = document.getElementById('keep-array-indentation').checked;
      var braces_on_own_line = document.getElementById('braces-on-own-line').checked;
      if (indent_size == 1) {
        indent_char = '\t';
      }
      if (js_source && js_source[0] === '<' && js_source.substring(0, 4) !== '<!--') {
        document.getElementById('json_input').value = style_html(js_source, indent_size, indent_char, 80);
      } else {
        document.getElementById('json_input').value =
          js_beautify(unpacker_filter(js_source), {
          indent_size: indent_size,
          indent_char: indent_char,
          preserve_newlines:preserve_newlines,
          braces_on_own_line: braces_on_own_line,
          keep_array_indentation:keep_array_indentation,
          space_after_anon_function:true});
      }
    }
	
	function get_var( name )
    {
      var res = new RegExp( "[\\?&]" + name + "=([^&#]*)" ).exec( window.location.href );
      return res ? res[1] : "";
    }

    function run_tests()
    {
      var st = new SanityTest();
      run_beautifier_tests(st);
      JavascriptObfuscator.run_tests(st);
      P_A_C_K_E_R.run_tests(st);
      EscapedBookmarklet.run_tests(st);
      document.getElementById('testresults').style.display='block';
      document.getElementById('testresults').innerHTML=st.results();
    }