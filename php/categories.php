<?php
require 'simple_html_dom.php';

$url = 'http://whatsonnetflix.com/netflix-hacks/the-netflix-id-bible-every-category-on-netflix/2';

$html = file_get_html($url);

$tr = $html->find('b');
$i = -1;
$generos = array();
foreach($tr as $td){
    $i++;
    $text = $td->innertext;

    $generos[$i] = $text;
}
    foreach($generos as $gen){
            //echo "Género: ".$gen."<br />";
    }
    $aux_generos = array();
    $i = -1;
    foreach($generos as $gen){
        $i++;
        $aux = trim($gen,")");
        $b = explode("(", $aux);
        $aux_generos[$i] = array(
            'nombre' => $b[0],
            'id' => $b[1]
        );
    }

    $fp = fopen('categories.json', 'w');
    fwrite($fp, json_encode($aux_generos, JSON_UNESCAPED_UNICODE));
    fclose($fp);

    echo json_encode($aux_generos, JSON_UNESCAPED_UNICODE);

?>