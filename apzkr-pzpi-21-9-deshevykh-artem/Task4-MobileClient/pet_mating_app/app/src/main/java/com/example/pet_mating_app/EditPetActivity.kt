package com.example.pet_mating_app

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

class EditPetActivity : AppCompatActivity() {
    private lateinit var apiService: ApiService
    private var petId: Int = -1
    private var currentOwnerId: Int = -1

    private lateinit var nameEditText: EditText
    private lateinit var speciesEditText: EditText
    private lateinit var breedEditText: EditText
    private lateinit var ageEditText: EditText
    private lateinit var genderSpinner: Spinner
    private lateinit var ownerSpinner: Spinner
    private lateinit var saveButton: Button

    private var users: List<User> = emptyList()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_edit_pet)

        apiService = (application as PetMatingApp).apiService
        petId = intent.getIntExtra("PET_ID", -1)

        initializeViews()
        setupGenderSpinner()
        loadUsers()

        if (petId != -1) {
            loadPetDetails(petId)
        }

        saveButton.setOnClickListener {
            savePetDetails()
        }
    }

    private fun initializeViews() {
        nameEditText = findViewById(R.id.nameEditText)
        speciesEditText = findViewById(R.id.speciesEditText)
        breedEditText = findViewById(R.id.breedEditText)
        ageEditText = findViewById(R.id.ageEditText)
        genderSpinner = findViewById(R.id.genderSpinner)
        ownerSpinner = findViewById(R.id.ownerSpinner)
        saveButton = findViewById(R.id.saveButton)
    }

    private fun setupGenderSpinner() {
        ArrayAdapter.createFromResource(
            this,
            R.array.gender_array,
            android.R.layout.simple_spinner_item
        ).also { adapter ->
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            genderSpinner.adapter = adapter
        }
    }

    private fun loadUsers() {
        apiService.getUsers().enqueue(object : Callback<List<User>> {
            override fun onResponse(call: Call<List<User>>, response: Response<List<User>>) {
                if (response.isSuccessful) {
                    users = response.body() ?: emptyList()
                    setupOwnerSpinner()
                } else {
                    Toast.makeText(this@EditPetActivity, "Failed to load users", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<User>>, t: Throwable) {
                Toast.makeText(this@EditPetActivity, "Network error", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun setupOwnerSpinner() {
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, users.map { it.username })
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        ownerSpinner.adapter = adapter
    }

    private fun loadPetDetails(petId: Int) {
        apiService.getPetById(petId).enqueue(object : Callback<Pet> {
            override fun onResponse(call: Call<Pet>, response: Response<Pet>) {
                if (response.isSuccessful) {
                    val pet = response.body()
                    pet?.let {
                        nameEditText.setText(it.name)
                        speciesEditText.setText(it.species)
                        breedEditText.setText(it.breed)
                        ageEditText.setText(it.age.toString())
                        val genderPosition = (genderSpinner.adapter as ArrayAdapter<String>).getPosition(it.gender)
                        genderSpinner.setSelection(genderPosition)
                        currentOwnerId = it.owner!!
                        setOwnerSpinnerSelection(it.owner)
                    }
                } else {
                    Toast.makeText(this@EditPetActivity, "Failed to load pet details", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Pet>, t: Throwable) {
                Toast.makeText(this@EditPetActivity, "Network error", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun setOwnerSpinnerSelection(ownerId: Int) {
        val ownerPosition = users.indexOfFirst { it.id == ownerId }
        if (ownerPosition != -1) {
            ownerSpinner.setSelection(ownerPosition)
        }
    }

    private fun savePetDetails() {
        val name = nameEditText.text.toString()
        val species = speciesEditText.text.toString()
        val breed = breedEditText.text.toString()
        val age = ageEditText.text.toString().toInt()
        val gender = genderSpinner.selectedItem.toString()
        val selectedOwnerPosition = ownerSpinner.selectedItemPosition
        val ownerId = if (selectedOwnerPosition != -1) users[selectedOwnerPosition].id else currentOwnerId

        if (name.isBlank() || species.isBlank() || breed.isBlank() || age == null || ownerId == -1) {
            Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show()
        }

        val updatedPet = Pet(
            id = petId,
            name = name,
            species = species,
            breed = breed,
            age = age,
            gender = gender,
            owner = ownerId
        )

        apiService.updatePet(petId, updatedPet).enqueue(object : Callback<Pet> {
            override fun onResponse(call: Call<Pet>, response: Response<Pet>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@EditPetActivity, "Pet updated successfully", Toast.LENGTH_SHORT).show()
                    finish()
                } else {
                    Toast.makeText(this@EditPetActivity, "Failed to update pet", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Pet>, t: Throwable) {
                Toast.makeText(this@EditPetActivity, "Network error", Toast.LENGTH_SHORT).show()
            }
        })
    }
}