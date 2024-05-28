import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:mobile/types/Participant.dart';
import 'package:mobile/types/Team.dart'; // For converting JSON data

Future<List<Team>> fetchTeams() async {
  print("fetching teams");
  final response = await http.get(Uri.parse('https://hackathon-reg-malayasia.ew.r.appspot.com/api/teams'));

  if (response.statusCode == 200) {
    // If the server returns a 200 OK response, parse the JSON
    List<dynamic> data = jsonDecode(response.body);
    return data.map((participant) => Team.fromJson(participant)).toList();
  } else {
    throw Exception('Failed to load teams');
  }
}
