<script>

</script>

The admin page

Lets make a form to create a game
need

a dropdown of all the user's

// section to create new users/ update /delete
name input type= text 
email input type= email
rank input type= number (default 1500)
status input type= dropdown (active, inactive)

// section to CRUD a new game
user1 input type= text
user2 input type= text
white input type= dropdown (user1, user2)
black input type= dropdown (user1, user2)
winner input type= dropdown (white, black, draw)
when did they play input type= datetimetsamp

<!-- user form -->
<form>
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname">
  <label for="email">Email:</label><br>
  <input type="email" id="email" name="email">
  <label for="rank">Rank:</label><br>
  <input type="number" id="rank" name="rank">
  <label for="status">Status:</label><br>
  <select id="status" name="status">
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </select>
  <input type="submit" value="Submit">
</form>

<!-- game submission form -->
<form>
  <!-- player 1 select dropdown -->

  <!-- player 2 select dropdown -->

  <!-- player 1 color dropdown -->

  <!-- player 2 color dropdown -->

  <!-- time game was played leave empty if game just happened -->

  <!-- winner dropdown [player1, player2, draw]-->
</form>