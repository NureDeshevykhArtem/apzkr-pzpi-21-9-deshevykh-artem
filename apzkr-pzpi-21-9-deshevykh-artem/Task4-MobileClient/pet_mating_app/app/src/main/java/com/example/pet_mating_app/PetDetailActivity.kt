package com.example.pet_mating_app

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.Spinner
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class PetDetailActivity : AppCompatActivity() {

    private lateinit var apiService: ApiService
    private lateinit var pet: Pet
    private lateinit var senderSpinner: Spinner
    private var users: List<User> = emptyList()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_pet_detail)

        apiService = (application as PetMatingApp).apiService
        senderSpinner = findViewById(R.id.senderSpinner)

        val petId = intent.getIntExtra("PET_ID", -1)
        if (petId != -1) {
            loadPetDetails(petId)
        }

        setupButtons()
        loadUsers()
    }

    private fun loadPetDetails(petId: Int) {
        apiService.getPetById(petId).enqueue(object : Callback<Pet> {
            override fun onResponse(call: Call<Pet>, response: Response<Pet>) {
                if (response.isSuccessful) {
                    pet = response.body()!!
                    displayPetDetails(pet)
                } else {
                    Toast.makeText(this@PetDetailActivity, "Failed to load pet details", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Pet>, t: Throwable) {
                Toast.makeText(this@PetDetailActivity, "Network error: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun displayPetDetails(pet: Pet) {
        findViewById<TextView>(R.id.petNameTextView).text = "Name: ${pet.name}"
        findViewById<TextView>(R.id.petSpeciesTextView).text = "Species: ${pet.species}"
        findViewById<TextView>(R.id.petBreedTextView).text = "Breed: ${pet.breed}"
        findViewById<TextView>(R.id.petAgeTextView).text = "Age: ${pet.age}"
        findViewById<TextView>(R.id.petGenderTextView).text = "Gender: ${pet.gender}"

        // Load owner details
        loadOwnerDetails(pet.owner!!)
    }

    private fun loadOwnerDetails(ownerId: Int) {
        apiService.getUserById(ownerId).enqueue(object : Callback<User> {
            override fun onResponse(call: Call<User>, response: Response<User>) {
                if (response.isSuccessful) {
                    val user = response.body()
                    user?.let { displayOwnerDetails(it) }
                }
            }

            override fun onFailure(call: Call<User>, t: Throwable) {
                // Handle error
            }
        })
    }

    private fun displayOwnerDetails(user: User) {
        findViewById<TextView>(R.id.ownerNameTextView).text = "Name: ${user.username}"
        findViewById<TextView>(R.id.ownerEmailTextView).text = "Email: ${user.email}"
        findViewById<TextView>(R.id.ownerLocationTextView).text = "Location: ${user.location}"
    }

    private fun setupButtons() {
        findViewById<Button>(R.id.editPetButton).setOnClickListener {
            val intent = Intent(this, EditPetActivity::class.java)
            intent.putExtra("PET_ID", pet.id)
            startActivity(intent)
        }

        findViewById<Button>(R.id.deletePetButton).setOnClickListener {
            showDeleteConfirmationDialog()
        }

        findViewById<Button>(R.id.sendMessageButton).setOnClickListener {
            val selectedUser = senderSpinner.selectedItem as User
            showSendMessageDialog(selectedUser)
        }
    }

    private fun loadUsers() {
        apiService.getUsers().enqueue(object : Callback<List<User>> {
            override fun onResponse(call: Call<List<User>>, response: Response<List<User>>) {
                if (response.isSuccessful) {
                    users = response.body() ?: emptyList()
                    setupSpinner()
                }
            }

            override fun onFailure(call: Call<List<User>>, t: Throwable) {
                // Обработка ошибки
            }
        })
    }

    private fun setupSpinner() {
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, users)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        senderSpinner.adapter = adapter
    }

    private fun showDeleteConfirmationDialog() {
        AlertDialog.Builder(this)
            .setTitle("Delete Pet")
            .setMessage("Are you sure you want to delete this pet?")
            .setPositiveButton("Yes") { _, _ -> deletePet() }
            .setNegativeButton("No", null)
            .show()
    }

    private fun deletePet() {
        apiService.deletePet(pet.id!!).enqueue(object : Callback<Unit> {
            override fun onResponse(call: Call<Unit>, response: Response<Unit>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@PetDetailActivity, "Pet deleted successfully", Toast.LENGTH_SHORT).show()
                    setResult(Activity.RESULT_OK)
                    finish()
                } else {
                    Toast.makeText(this@PetDetailActivity, "Failed to delete pet", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Unit>, t: Throwable) {
                Toast.makeText(this@PetDetailActivity, "Network error", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun showSendMessageDialog(sender: User) {
        val input = EditText(this)
        AlertDialog.Builder(this)
            .setTitle("Send Message")
            .setView(input)
            .setPositiveButton("Send") { _, _ ->
                val messageText = input.text.toString()
                if (::pet.isInitialized && pet.owner != 0) {
                    sendMessage(sender, pet.owner!!, messageText)
                } else {
                    Toast.makeText(this, "Unable to send message. Pet owner information is not available.", Toast.LENGTH_LONG).show()
                }
            }
            .setNegativeButton("Cancel", null)
            .show()
    }

    private fun sendMessage(sender: User, receiverId: Int, messageText: String) {
        val message = Message(sender.id, receiverId, messageText)
        apiService.sendMessage(message).enqueue(object : Callback<Unit> {
            override fun onResponse(call: Call<Unit>, response: Response<Unit>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@PetDetailActivity, "Message sent successfully", Toast.LENGTH_SHORT).show()
                } else {
                    val errorBody = response.errorBody()?.string()
                    Toast.makeText(this@PetDetailActivity, "Failed to send message: $errorBody", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<Unit>, t: Throwable) {
                Toast.makeText(this@PetDetailActivity, "Network error: ${t.message}", Toast.LENGTH_LONG).show()
            }
        })
    }

}