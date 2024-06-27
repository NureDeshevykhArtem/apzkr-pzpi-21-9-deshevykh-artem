package com.example.pet_mating_app

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.floatingactionbutton.FloatingActionButton
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MainActivity : AppCompatActivity() {
    private lateinit var apiService: ApiService
    private lateinit var petsAdapter: PetsAdapter

    private val DELETE_PET_REQUEST = 1
    private val ADD_PET_REQUEST = 2

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        apiService = (application as PetMatingApp).apiService

        val recyclerView = findViewById<RecyclerView>(R.id.petsRecyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this)
        petsAdapter = PetsAdapter(emptyList()) { pet ->
            showPetDetails(pet)
        }
        recyclerView.adapter = petsAdapter

        val addPetButton = findViewById<FloatingActionButton>(R.id.addPetButton)

        addPetButton.setOnClickListener {
            val intent = Intent(this, AddPetActivity::class.java)
            startActivityForResult(intent, ADD_PET_REQUEST)
        }

        loadPets()
    }

    private fun loadPets() {
        apiService.getPets().enqueue(object : Callback<List<Pet>> {
            override fun onResponse(call: Call<List<Pet>>, response: Response<List<Pet>>) {
                if (response.isSuccessful) {
                    val pets = response.body() ?: emptyList()
                    petsAdapter.updatePets(pets)
                } else {
                    Toast.makeText(this@MainActivity, "Failed to load pets", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Pet>>, t: Throwable) {
                Toast.makeText(this@MainActivity, "Network error", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun showPetDetails(pet: Pet) {
        val intent = Intent(this, PetDetailActivity::class.java)
        intent.putExtra("PET_ID", pet.id)
        startActivityForResult(intent, DELETE_PET_REQUEST)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if ((requestCode == DELETE_PET_REQUEST || requestCode == ADD_PET_REQUEST) && resultCode == Activity.RESULT_OK) {
            loadPets()
        }
    }
}