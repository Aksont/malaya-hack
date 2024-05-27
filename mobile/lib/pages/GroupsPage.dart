import 'package:flutter/material.dart';

class GroupsPage extends StatelessWidget {
  final groupTitle = 'Group title goes here';
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Card(
          child: ExpansionTile(
              title: Text(
                groupTitle,
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
              expandedAlignment: Alignment.centerLeft,
              childrenPadding: const EdgeInsets.symmetric(horizontal: 25.0, vertical: 10.0),
              children: const [Text("testing this")]),
        ),
        Card(
          child: ExpansionTile(
              title: Text(
                groupTitle,
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
              expandedAlignment: Alignment.centerLeft,
              childrenPadding: EdgeInsets.symmetric(horizontal: 25.0, vertical: 10.0),
              children: [Text("testing this")]),
        ),
      ],
    );
  }
}
