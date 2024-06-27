package com.example.pet_mating_app

import android.app.Activity
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.Spinner
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AddPetActivity : AppCompatActivity() {
    private lateinit var apiService: ApiService
    private lateinit var ownerSpinner: Spinner
    private var users: List<User> = emptyList()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_pet)

        apiService = (application as PetMatingApp).apiService
        ownerSpinner = findViewById(R.id.ownerSpinner)

        findViewById<Button>(R.id.savePetButton).setOnClickListener {
            savePet()
        }

        loadUsers()
    }

    private fun loadUsers() {
        apiService.getUsers().enqueue(object : Callback<List<User>> {
            override fun onResponse(call: Call<List<User>>, response: Response<List<User>>) {
                if (response.isSuccessful) {
                    users = response.body() ?: emptyList()
                    setupSpinner()
                } else {
                    Toast.makeText(this@AddPetActivity, "Failed to load users", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<User>>, t: Throwable) {
                Toast.makeText(this@AddPetActivity, "Network error", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun setupSpinner() {
        val userList = mutableListOf<String>("No owner")
        userList.addAll(users.map { it.username })

        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, userList)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        ownerSpinner.adapter = adapter
    }

    private fun savePet() {
        val name = findViewById<EditText>(R.id.petNameEditText).text.toString()
        val species = findViewById<EditText>(R.id.petSpeciesEditText).text.toString()
        val breed = findViewById<EditText>(R.id.petBreedEditText).text.toString()
        val age = findViewById<EditText>(R.id.petAgeEditText).text.toString().toIntOrNull() ?: 0
        val gender = findViewById<EditText>(R.id.petGenderEditText).text.toString()

        val selectedOwnerPosition = ownerSpinner.selectedItemPosition
        val ownerId = if (selectedOwnerPosition == 0) null else users[selectedOwnerPosition - 1].id

        val newPet = Pet(null, name, species, breed, age, gender, ownerId)

        apiService.createPet(newPet).enqueue(object : Callback<Pet> {
            override fun onResponse(call: Call<Pet>, response: Response<Pet>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@AddPetActivity, "Pet added successfully", Toast.LENGTH_SHORT).show()
                    setResult(Activity.RESULT_OK)
                    finish()
                } else {
                    Toast.makeText(this@AddPetActivity, "Failed to add pet", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Pet>, t: Throwable) {
                Toast.makeText(this@AddPetActivity, "Network error", Toast.LENGTH_SHORT).show()
            }
        })
    }
}