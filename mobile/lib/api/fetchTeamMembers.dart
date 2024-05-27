import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:mobile/types/Participant.dart'; // For converting JSON data

Future<List<Participant>> fetchTeamMembers(String teamId) async {
  print("fetching team members");
  final response = await http.get(Uri.parse('https://hackathon-reg-malayasia.ew.r.appspot.com/api/teams/$teamId'));

  if (response.statusCode == 200) {
    // If the server returns a 200 OK response, parse the JSON
    List<dynamic> data = jsonDecode(response.body)['members'];

    return data.map((participant) => Participant.fromJson(participant)).toList();
  } else {
    throw Exception('Failed to load team members');
  }
}
