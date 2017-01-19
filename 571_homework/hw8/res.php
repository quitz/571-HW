<?php
    header("Access-Control-Allow-Origin: *");
    //$cgapi = "http://congress.api.sunlightfoundation.com/";
    $cgapi= "http://104.198.0.197:8080/";
    $apikey = "a76bef19e5eb48a89e0343e89be6e228";
    //$apikey = "cbbc9c162edd449b8a071588ad6fa82b";

    $picurl = "http://theunitedstates.io/images/congress/225x275/";

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $chamber = strtolower($_POST['chamber']);
        $keyword = $_POST['kwName'];
        if($_POST['dbName'] == 'legislators'){
            $url = $cgapi.'legislators?apikey='.$apikey.'&per_page=all&chamber='.$chamber;
            $rejson = file_get_contents($url);
            echo $rejson;
        }
        else if($_POST['dbName'] == 'id'){
            $url = $cgapi.'legislators?apikey='.$apikey.'&bioguide_id='.$_POST['kwName'];
            $curl = $cgapi.'committees?apikey='.$apikey.'&member_ids='.$_POST['kwName'];
            $burl = $cgapi.'bills?apikey='.$apikey.'&sponsor_id='.$_POST['kwName'];
            $rejson = file_get_contents($url);            
            $crejson = file_get_contents($curl);
            $brejson = file_get_contents($burl);
            $a = json_decode($rejson, true);
            $b = json_decode($brejson, true);
            $c = json_decode($crejson, true);
            $a['results1'] = $c['results'];
            $a['results2'] = $b['results'];
            $res = json_encode($a);
            echo $res;
        }
        else if($_POST['dbName'] == 'committees'){
            $url = $cgapi.'committees?apikey='.$apikey.'&per_page=all';
            $rejson = file_get_contents($url);
            echo $rejson;                  
        }
        else if($_POST['dbName'] == 'bills'){
            $act = $_POST['act'];
            $url = $cgapi.'bills?apikey='.$apikey.'&history.active='.$act.'&per_page=50';
            $rejson = file_get_contents($url);
            echo $rejson;         
        }
        else{
            echo 'line290';
        }

    }
    else if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $chamber = strtolower($_GET['chamber']);
        $keyword = $_GET['kwName'];
        if($_GET['dbName'] == 'legislators'){
            $url = $cgapi.'legislators?apikey='.$apikey.'&per_page=all&chamber='.$chamber;
            $rejson = file_get_contents($url);
            echo $rejson;
        }
        else if($_GET['dbName'] == 'id'){
            $url = $cgapi.'legislators?apikey='.$apikey.'&bioguide_id='.$_GET['kwName'];
            $curl = $cgapi.'committees?apikey='.$apikey.'&member_ids='.$_GET['kwName'];
            $burl = $cgapi.'bills?apikey='.$apikey.'&sponsor_id='.$_GET['kwName'];
            $rejson = file_get_contents($url);            
            $crejson = file_get_contents($curl);
            $brejson = file_get_contents($burl);
            $a = json_decode($rejson, true);
            $b = json_decode($brejson, true);
            $c = json_decode($crejson, true);
            $a['results1'] = $c['results'];
            $a['results2'] = $b['results'];
            $res = json_encode($a);
            echo $res;
        }
        else if($_GET['dbName'] == 'committees'){
            $url = $cgapi.'committees?apikey='.$apikey.'&per_page=all';
            $rejson = file_get_contents($url);
            echo $rejson;                  
        }
        else if($_GET['dbName'] == 'bills'){
            $act = $_GET['act'];
            $url = $cgapi.'bills?apikey='.$apikey.'&history.active='.$act.'&per_page=50';
            $rejson = file_get_contents($url);
            echo $rejson;         
        }
        else{
            echo 'line290';
        }
    }
    header('Access-Control-Allow-Origin:*'); 
?>