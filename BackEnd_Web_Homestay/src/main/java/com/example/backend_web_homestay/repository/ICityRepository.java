package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.DTO.CityDTO;
import com.example.backend_web_homestay.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ICityRepository extends JpaRepository<City, Long> {
    @Query(value = "select c.id as id, c.image as image, c.name as name, count(h.city_id) as countCity  from city c\n" +
            "left join homestay h on h.city_id = c.id\n" +
            "where c.id between 1 and 4\n" +
            "group by c.id;", nativeQuery = true)
    Iterable<CityDTO> getCityTop1();

    @Query(value = "select c.id as id, c.image as image, c.name as name, count(h.city_id) as countCity  from city c\n" +
            "left join homestay h on h.city_id = c.id\n" +
            "where c.id between 5 and 8\n" +
            "group by c.id;", nativeQuery = true)
    Iterable<CityDTO> getCityTop2();

    @Query(value = "select c.id as id, c.image as image, c.name as name, count(h.city_id) as countCity  from city c\n" +
            "left join homestay h on h.city_id = c.id\n" +
            "where c.id between 9 and 12\n" +
            "group by c.id;", nativeQuery = true)
    Iterable<CityDTO> getCityTop3();
}
