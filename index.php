<!DOCTYPE html>
<html lang="en">
  <?php include('includes/header.inc.html'); ?>
  <body>
    <div class="content-container">
      <?php include('includes/sidebar.inc.html'); ?>
      <div id="main">
        <?php include('includes/nav.inc.html'); ?>
        <?php require_once('router.php'); ?>
        <?php include('includes/footer.inc.html'); ?>
      </div>
    </div>
  </body>
</html>
