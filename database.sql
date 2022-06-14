-- Table: gazetteer.place_names

-- DROP TABLE gazetteer.place_names;

CREATE TABLE IF NOT EXISTS gazetteer.place_names
(
    name_id numeric(10,0) NOT NULL,
    latitude double precision,
    longitude double precision,
    altitude double precision,
    feature_type_code double precision, -- SHOULD BE NUMERIC
    narrative character varying(4000) COLLATE pg_catalog."default",
    named_for character varying(4000) COLLATE pg_catalog."default",
    meeting_date character varying(200) COLLATE pg_catalog."default", -- SHOULD BE A DATE!
    meeting_paper character varying(200) COLLATE pg_catalog."default",
    date_revised timestamp without time zone,
    gazetteer character varying(20) COLLATE pg_catalog."default",
    country_id double precision,
    place_id double precision,
    --remote_sensor_info character varying(200) COLLATE pg_catalog."default",
    coordinate_accuracy double precision,
    altitude_accuracy double precision,
    source_authority character varying(100) COLLATE pg_catalog."default",
    source_person character varying(100) COLLATE pg_catalog."default",
    accepted_by character varying(100) COLLATE pg_catalog."default",
    source_country_code character varying(100) COLLATE pg_catalog."default",
    source_name character varying(500) COLLATE pg_catalog."default",
    source_scale character varying(15) COLLATE pg_catalog."default",
    scar_map_cat_id numeric(10,0),
    comments character varying(2000) COLLATE pg_catalog."default",
    source_publisher character varying(100) COLLATE pg_catalog."default",
    source_identifier character varying(100) COLLATE pg_catalog."default",
    date_named timestamp without time zone,
    image_antarctica_id character varying(30) COLLATE pg_catalog."default",
    location_method_id numeric(10,0),
    geometry geometry,
    reason character varying(5000) COLLATE pg_catalog."default",
    relic_flag boolean,
    aus_display_scale_20m boolean,
    aus_display_scale_10m boolean,
    aus_display_scale_5m boolean,
    aus_display_scale_2m boolean,
    aus_display_scale_1m boolean,
    aus_display_scale_500k boolean,
    aus_display_scale_250k boolean,
    aus_display_scale_100k boolean,
    aus_display_scale_50k boolean,
    aus_display_scale_25k boolean,
    aus_display_scale_10k boolean,
    aus_display_scale_5k boolean,
    aus_display_scale_1k boolean,
    pcpn character varying(100) COLLATE pg_catalog."default",
    place_name_gazetteer character varying(500) COLLATE pg_catalog."default",
    place_name_mapping character varying(500) COLLATE pg_catalog."default",
    --test geometry,
    view_by_public_flag boolean,
    --pronunciation_file character varying(100) COLLATE pg_catalog."default",
    country_code character varying(2) COLLATE pg_catalog."default",
    CONSTRAINT place_names_new_pkey PRIMARY KEY (name_id)
)

TABLESPACE pg_default;

ALTER TABLE gazetteer.place_names
    OWNER to postgres;

GRANT SELECT ON TABLE gazetteer.place_names TO geoserver_ro;

GRANT ALL ON TABLE gazetteer.place_names TO postgres;